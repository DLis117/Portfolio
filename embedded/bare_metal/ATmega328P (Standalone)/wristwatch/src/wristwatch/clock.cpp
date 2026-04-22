#include <DS3231.h>

static DS3231 clock;
static RTCDateTime rdt;

void clock_init()
{
  clock.begin();
}

void clock_set_date_time()
{
  clock.setDateTime(__DATE__, __TIME__); // set the time to current time
}

void clock_get_date_time()
{
  rdt = clock.getDateTime();
}

// returning pointer to avoid structure copy for optimisation
RTCDateTime* clock_get_rdt_ptr()
{
  return &rdt;
}
