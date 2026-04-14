#include <avr/io.h>

void ADC_init()
{
    // Because we will convert analog to digital we need to set a reference voltage
    // The default reference voltage for Arduino is 5V
    // in that case ADC will measure voltage in range 0 - 5V

    // 0V   -> ADC =0
    // 2.5V -> ADC = 512
    // 5V   -> ADC = 1023
    ADMUX = (1 << REFS0);

    ADCSRA = (1 << ADEN); // ADC enable

    // to use ADC we also need a prescaler
    // to get stable readings we will go with 50-200KHz
    // and 128 prescaler
    ADCSRA |= (1 << ADPS2) | (1 << ADPS1) | (1 << ADPS0); // 128 prescaler
}

uint16_t ADC_read(uint8_t ADC_channel)
{
    
    // by default channel for reading is PC0 (because no ADMUX3..0 are set so it means ADC0)
    // if we want to set ADC channel:

    // we keep first 4 bits of ADMUX register
    // and we add channel bits to it setting a channel
    ADMUX = (ADMUX & 0b11110000) | (ADC_channel & 0b00001111);

    ADCSRA |= (1 << ADSC);      // Start ADC conversion
    while(ADCSRA & (1<<ADSC));  //if ADC is busy already converting a value then loop endlessly
    return ADC;                 //after a conversion result will be written into ADC register
}