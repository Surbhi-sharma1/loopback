// For table Customer in the Postgres
/* TABLE IF NOT EXISTS public.customer
(
    customerid integer NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    website text COLLATE pg_catalog."default" NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT customer_pkey PRIMARY KEY (customerid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer
    OWNER to postgres;*/

//For table Pusers in the postgres

/*CREATE TABLE IF NOT EXISTS public.pusers
(
    customerid integer,
    id integer NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default",
    middlename character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    phone character varying(50) COLLATE pg_catalog."default",
    role character varying(50) COLLATE pg_catalog."default",
    address character varying(50) COLLATE pg_catalog."default",
    customername character varying(50) COLLATE pg_catalog."default",
    password character varying(200) COLLATE pg_catalog."default" DEFAULT 'test123'::character varying,
    CONSTRAINT fk_role FOREIGN KEY (role)
        REFERENCES public.roleuser (name) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pusers_customerid_fkey FOREIGN KEY (customerid)
        REFERENCES public.customer (customerid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pusers
    OWNER to postgres;*/

// For the table roleuser in the Postgres

/*
CREATE TABLE IF NOT EXISTS public.roleuser
(
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    key text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_name PRIMARY KEY (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.roleuser
    OWNER to postgres;*/

// For the table usertable in postgres
/*
CREATE TABLE IF NOT EXISTS public.usertable
(
    customerid integer,
    id integer NOT NULL,
    firstname text COLLATE pg_catalog."default" NOT NULL,
    middlename text COLLATE pg_catalog."default" NOT NULL,
    lastname text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    phone text COLLATE pg_catalog."default" NOT NULL,
    role text COLLATE pg_catalog."default",
    address text COLLATE pg_catalog."default" NOT NULL,
    customername text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.usertable
    OWNER to postgres;

-- Trigger: trigger_set_timestamp

-- DROP TRIGGER IF EXISTS trigger_set_timestamp ON public.usertable;

CREATE TRIGGER trigger_set_timestamp
    BEFORE UPDATE 
    ON public.usertable
    FOR EACH ROW
    EXECUTE FUNCTION public.set_timestamp();*/