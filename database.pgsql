--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: candidates; Type: TABLE; Schema: public; Owner: u0_a440
--

CREATE TABLE public.candidates (
    name character varying(20) NOT NULL,
    age smallint NOT NULL,
    digit integer NOT NULL,
    party_id integer NOT NULL,
    position_id integer,
    votes smallint DEFAULT 0,
    state character varying(2) NOT NULL,
    CONSTRAINT candidates_age_check CHECK (((age >= 18) AND (age <= 70)))
);


ALTER TABLE public.candidates OWNER TO u0_a440;

--
-- Name: parties; Type: TABLE; Schema: public; Owner: u0_a440
--

CREATE TABLE public.parties (
    id integer NOT NULL,
    initials character varying(10) NOT NULL,
    fullname text NOT NULL
);


ALTER TABLE public.parties OWNER TO u0_a440;

--
-- Name: party_id_seq; Type: SEQUENCE; Schema: public; Owner: u0_a440
--

CREATE SEQUENCE public.party_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.party_id_seq OWNER TO u0_a440;

--
-- Name: party_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u0_a440
--

ALTER SEQUENCE public.party_id_seq OWNED BY public.parties.id;


--
-- Name: positions; Type: TABLE; Schema: public; Owner: u0_a440
--

CREATE TABLE public.positions (
    title character varying(20) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.positions OWNER TO u0_a440;

--
-- Name: positions_id_seq; Type: SEQUENCE; Schema: public; Owner: u0_a440
--

CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.positions_id_seq OWNER TO u0_a440;

--
-- Name: positions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: u0_a440
--

ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;


--
-- Name: voters; Type: TABLE; Schema: public; Owner: u0_a440
--

CREATE TABLE public.voters (
    name character varying(20) NOT NULL,
    age smallint NOT NULL,
    id smallint NOT NULL,
    voted_yet boolean DEFAULT false NOT NULL,
    CONSTRAINT voter_age_check CHECK (((age >= 16) AND (age <= 69)))
);


ALTER TABLE public.voters OWNER TO u0_a440;

--
-- Name: parties id; Type: DEFAULT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.parties ALTER COLUMN id SET DEFAULT nextval('public.party_id_seq'::regclass);


--
-- Name: positions id; Type: DEFAULT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);


--
-- Data for Name: candidates; Type: TABLE DATA; Schema: public; Owner: u0_a440
--

COPY public.candidates (name, age, digit, party_id, position_id, votes, state) FROM stdin;
\.


--
-- Data for Name: parties; Type: TABLE DATA; Schema: public; Owner: u0_a440
--

COPY public.parties (id, initials, fullname) FROM stdin;
15	MDB	Movimento Democrático Brasileiro
13	PT	Partido dos Trabalhadores
45	PSDB	Partido da Social Democracia Brasileira
11	PP	Progressistas
12	PDT	Partido Democrático Trabalhista
44	UNIÃO	União Brasil
22	PL	Partido Liberal
40	PSB	Partido Socialista Brasileiro
23		Cidadania
19	PODE	Podemos
65	PCdoB	Partido Comunista do Brasil
55	PSD	Partido Social Democrático
43	PV	Partido Verde
77		Solidariedade
50	PSOL	Partido Socialismo e Liberdade
70		Avante
33	PMN	Partido da Mobilização Nacional
36		Agir
90	PROS	Partido Republicano da Ordem Social
35	PMB	Partido da Mulher Brasileiro
18	REDE	Rede Sustentabilidade
30	NOVO	Partido Novo
16	PSTU	Partido Socialista dos Trabalhadores Unificado
21	PCB	Partido Comunista Brasileiro
29	PCO	Partido da Causa Operária
80	UP	Unidade Popular
\.


--
-- Data for Name: positions; Type: TABLE DATA; Schema: public; Owner: u0_a440
--

COPY public.positions (title, id) FROM stdin;
Presidente	1
Governador/a	2
Deputado/a Federal	3
Deputado/a Estadual	4
Senador/a	5
Prefeito/a	6
Vereador/a	7
\.


--
-- Data for Name: voters; Type: TABLE DATA; Schema: public; Owner: u0_a440
--

COPY public.voters (name, age, id, voted_yet) FROM stdin;
\.


--
-- Name: party_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u0_a440
--

SELECT pg_catalog.setval('public.party_id_seq', 1, false);


--
-- Name: positions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: u0_a440
--

SELECT pg_catalog.setval('public.positions_id_seq', 7, true);


--
-- Name: candidates candidates_pkey; Type: CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (digit);


--
-- Name: parties party_pkey; Type: CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.parties
    ADD CONSTRAINT party_pkey PRIMARY KEY (id);


--
-- Name: positions positions_pkey; Type: CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);


--
-- Name: voters voter_pkey; Type: CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.voters
    ADD CONSTRAINT voter_pkey PRIMARY KEY (id);


--
-- Name: candidates fk_party_id; Type: FK CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT fk_party_id FOREIGN KEY (party_id) REFERENCES public.parties(id);


--
-- Name: candidates fk_position_id; Type: FK CONSTRAINT; Schema: public; Owner: u0_a440
--

ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT fk_position_id FOREIGN KEY (position_id) REFERENCES public.positions(id);


--
-- PostgreSQL database dump complete
--

