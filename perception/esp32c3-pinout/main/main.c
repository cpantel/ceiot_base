/* Blink Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "esp_log.h"
#include "led_strip.h"
#include "sdkconfig.h"


/* Use project configuration menu (idf.py menuconfig) to choose the GPIO to blink,
   or you can edit the following line and set a number here.
*/
#define BLINK_GPIO CONFIG_BLINK_GPIO

/////static uint8_t s_led_state = 0;

typedef struct {
    uint8_t gpio_num;
    uint8_t state;
    char* label;

} pin_type;

#define PINS 11

pin_type pins[PINS] = {
    {GPIO_NUM_0, 1,"pin 00"},
    {GPIO_NUM_1, 1,"pin 01"},
    {GPIO_NUM_2, 1,"pin 02"},
    {GPIO_NUM_3, 1,"pin 03"},
//    {GPIO_NUM_4, 1,"pin 04"},
    {GPIO_NUM_5, 1,"pin 05"},
    {GPIO_NUM_6, 1,"pin 06"},
    {GPIO_NUM_7, 1,"pin 07"},
    //{GPIO_NUM_8, 1,"pin 08"},
    {GPIO_NUM_9, 1,"pin 09"},
    {GPIO_NUM_10, 1,"pin 10"},
    {GPIO_NUM_18, 1,"pin 18"},
    {GPIO_NUM_19, 1,"pin 19"}
};

uint32_t sequence[3][3] = {
   {0,0,255},
   {0,255,0},
   {255,0,0}
};


static led_strip_t *pStrip_a;

static void configure_led(void)
{
    ESP_LOGI("pinout finder", "Example configured to blink addressable LED!");
    /* LED strip initialization with the GPIO and pixels number*/
    pStrip_a = led_strip_init(CONFIG_BLINK_LED_RMT_CHANNEL, BLINK_GPIO, 1);
    /* Set all LED off to clear all pixels */
    pStrip_a->clear(pStrip_a, 50);
}

void app_main(void) {
    ESP_LOGI("pinout finder", "Example configured to blink addressable LED!");
    /* LED strip initialization with the GPIO and pixels number*/
    pStrip_a = led_strip_init(CONFIG_BLINK_LED_RMT_CHANNEL, BLINK_GPIO, 1);
    /* Set all LED off to clear all pixels */
    pStrip_a->clear(pStrip_a, 50);
    for (int idx = 0; idx < PINS; ++idx) {
        gpio_reset_pin(pins[idx].gpio_num);
        gpio_set_direction(pins[idx].gpio_num, GPIO_MODE_OUTPUT);
    }
    int seq_idx = 0;
    while (1) {
        for (int idx = 0; idx < PINS; ++idx) {
            ESP_LOGI("pinout finder","blinking: %s\n", pins[idx].label);
            pStrip_a->set_pixel(pStrip_a, 0, sequence[seq_idx][0], sequence[seq_idx][1],sequence[seq_idx][2]);
            pStrip_a->refresh(pStrip_a, 100);
            for (int times = 0; times < 8; ++times) {
                gpio_set_level(pins[idx].gpio_num, pins[idx].state);
                pins[idx].state  = ! pins[idx].state;
                vTaskDelay(125 / portTICK_PERIOD_MS);
            }

            vTaskDelay(2000 / portTICK_PERIOD_MS);

            ++seq_idx;
            if (seq_idx == 3) seq_idx = 0;
            vTaskDelay(4000 / portTICK_PERIOD_MS);
        }
    }
}

