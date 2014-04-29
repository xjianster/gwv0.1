
CREATE	TABLE  TABLE_GENERATOR(
	IID 		 					INTEGER	  						NOT NULL,
  	GEN_NAME 						VARCHAR(255) 					NOT NULL,
  	GEN_VALUE 						INTEGER   						NOT NULL,
  	PRIMARY KEY  (IID)
	);

CREATE TABLE UserEntity(
	IID								INTEGER							NOT NULL,
	NNAME 							varchar(255) 					not null,  
	PPASSWORD 						varchar(255) 					not null,  
	primary key(IID)  
);