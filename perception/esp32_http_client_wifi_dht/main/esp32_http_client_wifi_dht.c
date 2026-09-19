#include <stdio.h>
#include <string.h>

#include "freertos/FreeRTOS.h"
#include "freertos/event_groups.h"
#include "freertos/task.h"

#include "esp_event.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_wifi.h"
#include "nvs_flash.h"

#include <dht.h>

#include "esp_http_client.h"

#ifndef APP_CPU_NUM
#define APP_CPU_NUM PRO_CPU_NUM
#endif


#define WIFI_SSID       ""
#define WIFI_PASSWORD   ""

#define SERVER_URL      "http://192.168.1.101:8080/measurement"

#define DEVICE_ID "01"

#define WIFI_CONNECTED_BIT BIT0

#define SENSOR_TYPE DHT_TYPE_DHT11

#define INTERNAL_PULLUP 0
#define DATA_GPIO 17


static const char *TAG = "HTTP_TEST";
static EventGroupHandle_t wifi_event_group;

/* -----------------------------------------------------------
 * WiFi
 * --------------------------------------------------------- */

static void wifi_event_handler(void *arg,
                               esp_event_base_t event_base,
                               int32_t event_id,
                               void *event_data)
{
    if (event_base == WIFI_EVENT &&
        event_id == WIFI_EVENT_STA_START) {

        esp_wifi_connect();

    } else if (event_base == WIFI_EVENT &&
               event_id == WIFI_EVENT_STA_DISCONNECTED) {

        ESP_LOGI(TAG, "WiFi disconnected, reconnecting...");
        esp_wifi_connect();
        xEventGroupClearBits(wifi_event_group, WIFI_CONNECTED_BIT);

    } else if (event_base == IP_EVENT &&
               event_id == IP_EVENT_STA_GOT_IP) {

        ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;

        ESP_LOGI(TAG, "Got IP: " IPSTR,
                 IP2STR(&event->ip_info.ip));

        xEventGroupSetBits(wifi_event_group, WIFI_CONNECTED_BIT);
    }
}

static void wifi_init(void)
{
    wifi_event_group = xEventGroupCreate();

    ESP_ERROR_CHECK(esp_netif_init());

    ESP_ERROR_CHECK(
        esp_event_loop_create_default()
    );

    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();

    ESP_ERROR_CHECK(
        esp_wifi_init(&cfg)
    );

    ESP_ERROR_CHECK(
        esp_event_handler_register(
            WIFI_EVENT,
            ESP_EVENT_ANY_ID,
            &wifi_event_handler,
            NULL
        )
    );

    ESP_ERROR_CHECK(
        esp_event_handler_register(
            IP_EVENT,
            IP_EVENT_STA_GOT_IP,
            &wifi_event_handler,
            NULL
        )
    );

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASSWORD,
        },
    };

    ESP_ERROR_CHECK(
        esp_wifi_set_mode(WIFI_MODE_STA)
    );

    ESP_ERROR_CHECK(
        esp_wifi_set_config(
            WIFI_IF_STA,
            &wifi_config
        )
    );

    ESP_ERROR_CHECK(
        esp_wifi_start()
    );

    ESP_LOGI(TAG, "Connecting to WiFi...");
}

/* -----------------------------------------------------------
 * HTTP event
 * --------------------------------------------------------- */

static esp_err_t http_event_handler(
    esp_http_client_event_t *evt)
{
    switch (evt->event_id) {

    case HTTP_EVENT_ON_DATA:

        printf("%.*s",
               evt->data_len,
               (char *)evt->data);

        break;

    default:
        break;
    }

    return ESP_OK;
}

/* -----------------------------------------------------------
 * GET
 * --------------------------------------------------------- */

static void http_get(void)
{
    ESP_LOGI(TAG, "GET %s", SERVER_URL);

    esp_http_client_config_t config = {
        .url = SERVER_URL,
        .event_handler = http_event_handler,
    };

    esp_http_client_handle_t client =
        esp_http_client_init(&config);

    esp_http_client_set_method(
        client,
        HTTP_METHOD_GET
    );

    esp_err_t err =
        esp_http_client_perform(client);

    if (err == ESP_OK) {

        ESP_LOGI(TAG,
                 "GET status = %d, content_length = %lld",
                 esp_http_client_get_status_code(client),
                 esp_http_client_get_content_length(client));

    } else {

        ESP_LOGE(TAG,
                 "GET failed: %s",
                 esp_err_to_name(err));
    }

    esp_http_client_cleanup(client);
}

/* -----------------------------------------------------------
 * POST
 * --------------------------------------------------------- */


static char *POST_DATA_TEMPLATE = "id="DEVICE_ID"&t=%0.2f&h=%0.2f";

static void http_post(float *pressure, float *temperature, float *humidity) {

    char post_data[64];

    sprintf(post_data,POST_DATA_TEMPLATE, *temperature, *humidity);

    ESP_LOGI(TAG, "POST %s", SERVER_URL);
    ESP_LOGI(TAG, "POST_DATA %s", post_data);

    esp_http_client_config_t config = {
        .url = SERVER_URL,
        .event_handler = http_event_handler,
    };

    esp_http_client_handle_t client =
        esp_http_client_init(&config);

    esp_http_client_set_method(
        client,
        HTTP_METHOD_POST
    );

    esp_http_client_set_header(
        client,
        "Content-Type",
        "application/x-www-form-urlencoded"
    );

    esp_http_client_set_post_field(
        client,
        post_data,
        strlen(post_data)
    );

    esp_err_t err =
        esp_http_client_perform(client);

    if (err == ESP_OK) {

        ESP_LOGI(TAG,
                 "POST status = %d",
                 esp_http_client_get_status_code(client));

    } else {

        ESP_LOGE(TAG,
                 "POST failed: %s",
                 esp_err_to_name(err));
    }

    esp_http_client_cleanup(client);
}

/* -----------------------------------------------------------
 * Main
 * --------------------------------------------------------- */

void app_main(void)
{
    ESP_ERROR_CHECK(
        nvs_flash_init()
    );

    wifi_init();

    /* Wait for WiFi */
    xEventGroupWaitBits(
        wifi_event_group,
        WIFI_CONNECTED_BIT,
        pdFALSE,
        pdTRUE,
        portMAX_DELAY
    );

    ESP_LOGI(TAG, "WiFi connected");

    vTaskDelay(pdMS_TO_TICKS(1000));

    float pressure, temperature, humidity;
    while (1) { 
       if (dht_read_float_data(SENSOR_TYPE, DATA_GPIO, &humidity, &temperature) == ESP_OK) {
            printf("Humidity: %.1f%% Temp: %.1fC\n", humidity, temperature);
            http_post(&pressure, &temperature, &humidity);
       } else {
            printf("Could not read data from sensor\n");
        }
       vTaskDelay(pdMS_TO_TICKS(5000));
    }
}
