#ifndef SPI_TRANSFER_STATUS_H
#define SPI_TRANSFER_STATUS_H

typedef enum
{
    TRANSFER_IDLE,
    TRANSFER_PENDING,
    TRANSFER_FINISHED
} spi_transfer_status;

#endif