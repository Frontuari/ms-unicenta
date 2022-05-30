CREATE TABLE `ms_logs` (
    `created` datetime DEFAULT current_timestamp(),
    `process` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `status` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `logs` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `ticket_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE tickets
ADD exist_error varchar(1) DEFAULT 'N' NULL;
ALTER TABLE customers
ADD isimported varchar(1) DEFAULT 'N' NULL;
ALTER TABLE categories
ADD isimported varchar(1) DEFAULT 'N' NULL;
CREATE TABLE ms_pos_payments (
    id varchar(100) NULL,
    external_id varchar(100) NULL,
    name varchar(100) NULL,
    `type` varchar(100) NULL,
    status varchar(1) DEFAULT 1 NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
ALTER TABLE ms_pos_payments
ADD app varchar(100) NULL;
INSERT INTO ms_pos_payments (id, external_id, name, `type`, status, app)
VALUES (
        'bank',
        '1000008',
        'Tarjeta de Debito',
        'D',
        '1',
        'idempiere'
    ),
    (
        'bank2',
        '1000003',
        'Tarjeta de Credito',
        'C',
        '1',
        'idempiere'
    ),
    (
        'bankTransfer',
        '1000001',
        'Transferencia Bancaria',
        'A',
        '1',
        'idempiere'
    ),
    (
        'cash',
        '1000004',
        'Efectivo',
        'X',
        '1',
        'idempiere'
    ),
    (
        'cash_usd',
        '1000004',
        'Efectivo USD',
        'X',
        '1',
        'idempiere'
    ),
    (
        'cashrefund',
        NULL,
        'Reembolso',
        NULL,
        '1',
        'idempiere'
    ),
    (
        'debt',
        '1000007',
        'A Credito',
        'R',
        '1',
        'idempiere'
    ),
    (
        'slip',
        '1000006',
        'Zelle',
        'A',
        '1',
        'idempiere'
    ),
    (
        'Pago Móvil',
        NULL,
        'Pago Móvil',
        NULL,
        '1',
        'idempiere'
    );
CREATE TABLE ms_tasks (
    id BIGINT auto_increment NOT NULL,
    name varchar(255) NULL,
    actived varchar(1) DEFAULT 'N' NOT NULL,
    CONSTRAINT ms_tasks_PK PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
INSERT INTO ms_tasks (name, actived)
VALUES('sync sale orders', 'Y');
INSERT INTO ms_tasks (name, actived)
VALUES('sync return sale orders', 'Y');
ALTER TABLE currencyrates
MODIFY COLUMN validto datetime DEFAULT NOW() NULL;