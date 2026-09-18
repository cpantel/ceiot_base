/* HTTP GET Example using plain POSIX sockets

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
#include "sdkconfig.h"

typedef struct {
    uint8_t gpio_num;
    uint8_t state;
    char* label;

} pin_type;

#define PINS 6 

pin_type pins[PINS] = {
    {GPIO_NUM_15,1,"pin 15"},
    {GPIO_NUM_2, 1,"pin 02"},
    {GPIO_NUM_4, 1,"pin 04"},
    {GPIO_NUM_0, 1,"pin 00"},
    {GPIO_NUM_16,1,"pin 16"},
    {GPIO_NUM_21,1,"pin 21"}
};

void app_main(void)
{
    for (int idx = 0; idx < PINS; ++idx) {
        gpio_reset_pin(pins[idx].gpio_num);
        gpio_set_direction(pins[idx].gpio_num, GPIO_MODE_OUTPUT);
    }

    while (1) {
        for (int idx = 0; idx < PINS; ++idx) {
            ESP_LOGI("pinout finder","blinking: %s\n", pins[idx].label);
	    for (int times = 0; times < 8; ++times) {
                gpio_set_level(pins[idx].gpio_num, pins[idx].state);
                pins[idx].state  = ! pins[idx].state;
                vTaskDelay(125 / portTICK_PERIOD_MS);
            }		
            vTaskDelay(2000 / portTICK_PERIOD_MS);
	}
        vTaskDelay(4000 / portTICK_PERIOD_MS);
    }       
}
