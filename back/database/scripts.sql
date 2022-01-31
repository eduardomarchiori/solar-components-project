CREATE TABLE users (
	user_id UUID NOT NULL PRIMARY KEY,
  name VARCHAR ( 100 ) UNIQUE NOT NULL,
	email VARCHAR ( 100 ) UNIQUE NOT NULL,
	password VARCHAR ( 100 ) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	disabled_at TIMESTAMP
);

CREATE TABLE solar_components (
	solar_component_id UUID NOT NULL PRIMARY KEY,
  name VARCHAR ( 100 ) unique NOT NULL,
	gtim VARCHAR ( 200 ) NOT NULL,
	sector VARCHAR ( 10 ) NOT NULL,
	component_group VARCHAR ( 20 ) NOT NULL,
	gross_weight numeric(10, 2) NOT NULL,
	net_weight numeric(10, 2) NOT NULL,
	user_id UUID REFERENCES users (user_id),
	logistic_dimension_id UUID REFERENCES logistics_dimensions (logistic_dimension_id),
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	disabled_at TIMESTAMP
);

CREATE TABLE logistics_dimensions (
	logistic_dimension_id UUID NOT NULL PRIMARY KEY,
  height numeric(10, 2) NOT NULL,
	width numeric(10, 2) NOT NULL,
	depth numeric(10, 2) NOT NULL,
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,
	disabled_at TIMESTAMP
);