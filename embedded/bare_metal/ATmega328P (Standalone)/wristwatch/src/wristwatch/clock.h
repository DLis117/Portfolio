#ifndef CLOCK_H
#define CLOCK_H

#include <DS3231.h>

void clock_init();
void clock_set_date_time();
void clock_get_date_time();
RTCDateTime* clock_get_rdt_ptr();

#endif