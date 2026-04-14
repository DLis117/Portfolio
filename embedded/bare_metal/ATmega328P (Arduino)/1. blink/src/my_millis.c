// to create millis function, we need 3 things: waveform generator, prescaler and interrupts.

#include <avr/io.h>
#include <avr/interrupt.h>

// we use volatile keyword here because value of that variable is based on clock cycles
// static so it can only be modified in this file
volatile static uint32_t ms_counter = 0;

void my_millis_init()
{
    // WGM
    // to have more control over counter we will use CTC mode.

    TCCR0A |= (1 << WGM01);
    TCCR0A &= ~(1 << WGM00);
    TCCR0A &= ~(1 << WGM02);

    // PRESCALER
    // we need to use prescaler to slow down MCU's clock
    // Arduino works by default on 16MHz
    // we will use 64 prescaler (16000000/64 = 250000 ticks per second which is 250 tick per ms)

    TCCR0B &= ~(1 << CS02);
    TCCR0B |= (1 << CS01);
    TCCR0B |= (1 << CS00);

    // INTERRUPTS
    // OCR0A tells after how many ticks it will overflow counter and do an interrupt
    // we want our counter to count 250 ticks (250 * 4 = 1000)
    // knowing that counter counts from 0 we need to set OCR0A to 249 (0 - 249 gives exactly 250 ticks)

    OCR0A = 249;
    TIMSK0 |= (1 << OCIE0A); // allows for ISR (Interrupt Sub Routine)
    sei();                   // global interrupt enable
}

ISR(TIMER0_COMPA_vect) // code executed by interrupt every 1 ms
{
    ms_counter++;
}

uint32_t my_millis()
{
    // when executing code line by line the clock tick may change causing non precise reading
    // so to get precise reading we need to stop interrupts, read value and enable interrupts again
    uint32_t time;
    cli(); // disables global interrupts
    time = ms_counter;
    sei(); // enables global interrupts
    return time;
}