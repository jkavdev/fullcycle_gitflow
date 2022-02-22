-- -- criando usuario
-- CREATE USER 'docker'@'localhost' IDENTIFIED BY 'docker';
-- FLUSH PRIVILEGES;

-- -- criando banco de dados
-- create database nodedb;

-- definindo todos os acessos somente ao usuario criado
-- GRANT ALL PRIVILEGES ON `nodedb` . * TO 'docker'@'localhost';
-- FLUSH PRIVILEGES;

-- selecionando o banco
use nodedb;

-- criando a tabela
create table people(
	name varchar(255) not null
);