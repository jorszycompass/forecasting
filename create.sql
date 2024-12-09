-- main.production_sheet

-- Drop table

-- DROP TABLE main.production_sheet

 CREATE TABLE main.production_sheet
 (
    production_sheet_id UUID PRIMARY KEY,
    unit_id INT,
    sheet_date DATE DEFAULT CURRENT_DATE
 );

-- main.production_sheet_items

-- Drop table

-- DROP TABLE main.production_sheet_item

CREATE TABLE main.production_sheet_item
(
    item_id UUID PRIMARY KEY,
    menu_id UUID NOT NULL,
    "name" varchar(255) NOT NULL,
    production_sheet_id UUID NOT NULL,
    last_week_amount INT,
    forecasted_amount INT,
    forecast_description TEXT,
    brand_name varchar(255),
    CONSTRAINT fk_production_sheet FOREIGN KEY (production_sheet_id) REFERENCES main.production_sheet(production_sheet_id)
);