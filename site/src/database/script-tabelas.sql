-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/

DROP DATABASE if exists Mindbridge;
CREATE DATABASE if not exists Mindbridge;
USE Mindbridge;

CREATE TABLE InstituicaoEnsino(
idInstituicaoEnsino INT PRIMARY KEY AUTO_INCREMENT,
nomeEscola VARCHAR(50) NOT NULL,
CNPJ INT NOT NULL,
CEP INT NOT NULL,
Logradouro VARCHAR(50) NOT NULL,
numeroLogradouro VARCHAR(6) NOT NULL,
Complemento VARCHAR(6),
Bairro VARCHAR(50) NOT NULL,
Cidade VARCHAR(50) NOT NULL,
Estado VARCHAR(50) NOT NULL,
Telefone VARCHAR(25) NOT NULL,
modalidadeEnsino VARCHAR(50) NOT NULL,
CHECK (modalidadeEnsino = 'Escola' || modalidadeEnsino = 'Escola de Cursos' || 
modalidadeEnsino = 'Escola Técnica' || modalidadeEnsino  = 'Universidade')
);

CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
sobrenome VARCHAR(50) NOT NULL,
email VARCHAR(100)NOT NULL,
senha VARCHAR(50),
tipoUser VARCHAR(50),
CHECK (tipoUser = 'Administrador' || tipoUser = 'Aluno'),
fkInstituicao INT,
FOREIGN KEY (fkInstituicao) REFERENCES InstituicaoEnsino(idInstituicaoEnsino)
);

CREATE TABLE Pontuacao(
idPontuacao INT PRIMARY KEY AUTO_INCREMENT,
Pontos INT,
fkUser INT,
FOREIGN KEY (fkUser) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Maquinas(
idMaquinas INT PRIMARY KEY AUTO_INCREMENT,
IP INT NOT NULL,
Marca VARCHAR(50) NOT NULL,
Modelo VARCHAR(50) NOT NULL,
SistemaOperacional VARCHAR(50) NOT NULL,
Processador VARCHAR(50) NOT NULL,
RAM INT NOT NULL,
Disco INT NOT NULL,
fkInstituicao INT,
FOREIGN KEY (fkInstituicao) REFERENCES InstituicaoEnsino(idInstituicaoEnsino)
);
/*insert into Maquinas Values(default, 1111111111, 'Dell', 'Inpiron15', 'Windows 11', 'Ryzen 5', '8', '500');*/

CREATE TABLE registroMaquina(
idRegistroMaquina INT PRIMARY KEY AUTO_INCREMENT,
TemperaturaProcessador INT NOT NULL,
usoRam INT NOT NULL,
usoProcessador INT NOT NULL,
usoDisco INT NOT NULL,
usoRede INT NOT NULL,
dtHora DATETIME,
fkMaquinas INT,
FOREIGN KEY (fkMaquinas) REFERENCES Maquinas(idMaquinas)
);

CREATE TABLE tbLogMaquina(
fkMaquinas INT,
fkUsuario INT,
dtHora DATETIME PRIMARY KEY NOT NULL,
FOREIGN KEY (fkMaquinas) REFERENCES Maquinas(idMaquinas),
FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario)
);

select * from Usuario inner join InstituicaoEnsino;

/*
comandos para criar usuário em banco de dados azure, sqlserver,
com permissão de insert + update + delete + select
*/

CREATE USER [usuarioParaAPIWebDataViz_datawriter_datareader]
WITH PASSWORD = '#Gf_senhaParaAPIWebDataViz',
DEFAULT_SCHEMA = dbo;

EXEC sys.sp_addrolemember @rolename = N'db_datawriter',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';

EXEC sys.sp_addrolemember @rolename = N'db_datareader',
@membername = N'usuarioParaAPIWebDataViz_datawriter_datareader';
