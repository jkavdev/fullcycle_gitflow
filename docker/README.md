# Docker
* DOCKER - o docker ele cria um host, que fornece uma api, e quando eh chamado o comando docker, eh um cliente que conversa com o host atraves da sua api
** o docker eh nativo do LINUX, mas podemos rodar em outros sistemas operacionais

* CONTAINERS - é uma unidade de software que empacota tudo que uma aplicacao necessita para ser executada, podendo ser executada em qualquer ambiente
** simula um sistema operacional com apenas os processos necessarios para aplicacao rodar apenas, por isso container sao leves
** quando executar um container, ele eh totalmente isolado de onde ta sendo executado, nao havendo o problema de o container para a maquina host por falta de recursos. Podemos ate definir o quanto de processamento o container vai consumir na maquina host
** container utiliza a estrategia de layers, em que para uma imagem ela eh constituida de varias camadas, no qual podemos reutilizar essas camadas em outras imagens
** container conseguem se comunicar com outros container atraves da rede que o docker disponibiliza
** para que possamos salvar as alteracoes feitas no container, como adicao de arquivos, precisamos criar volumes, para que ele salve o trabalho feito no container em algum lugar, pois quando o container morre, todos os dados morrem tambem

* DOCKERFILE - arquivo que define as imagens e configuracoes dos containers que queremos contruir

* IMAGEM - uma imagem eh totalmente imutavel, nao conseguimos alterar essa imagem
** quando rodamos uma imagem, estamos criando um container, container eh um objeto criado a partir da imagem
** quando alteramos alguma coisa no container, ou mesmo adicionamos ou removemos arquivos, estamos alterando uma camada de escrita e leitura
** que quando o container morre, essa camada tambem morre
** podemos gerar uma outra imagem a partir de uma imagem que ja tenha sua camada de escrita/leitura ja alterada, atraves do commit

** WSL - windows subsystem linux - eh o embarcamento do linux para dentro do windows, para que se possa ser desenvolver no linux no windows sempre precisar fazer um dual boot

# Docker Comandos

* rodando o container hello world e o nomeando com hello-world

    `docker run --name hello-world hello-world`

* rodando o container hello world, mas removendo o container quando ficar inativo

    `docker run --name hello-world --rm hello-world`    

* listando todos os containers

    `docker container ps -a`

* listando todos os containers ativos

    `docker container ps`

* removendo varios containers

    `docker rm NOME_CONTAINER NOME_CONTAINER...`

* removendo varios containers com force

    `docker rm NOME_CONTAINER NOME_CONTAINER... -f`

* iniciando um container inativo

    `docker start NOME_CONTAINER`    

* rodando um container no modo interativo(para acessar o bash) e tty(para que possa escrever no bash), para que possa interagir com o container no caso, o bash do ubuntu

    `docker run -it --rm --name ubuntu ubuntu`

* rodando um container que exporta uma porta para a maquina host e rodando desatachado do bash atual. `-p` PORTA_HOST:PORTA_CONTAINER, `-d` pra rodar desatachado

    `docker run --name nginx -p 8080:80 -d --rm nginx`

* atachando ao container rodando em outro bash, temos que indicar que que sera no modo interativo e qual comando querendo executar, no caso o bash

    `docker exec -it nginx bash`    

* modificando o container, instalando o vim para alterar o html do nginx

    `docker exec -it nginx bash`
    
    * dentro do bash, atualizar os pacotes base, para que possa instalar outros pacotes

    `apt-get update`

    * instalando o vim

    `apt-get install vim`

* rodando um container mapeando um volume

    nao funciona - `docker run --name nginx -p 8080:80 -d --rm -v ~/Documents/docker:/usr/share/nginx/html nginx`

    funciona - `docker run --name nginx -p 8080:80 -d --rm -v C:/Users/jkavdev/Documents/docker:/usr/share/nginx/html nginx`

    funciona - `docker run --name nginx -p 8080:80 -d --rm -v C:\Users\jkavdev\Documents\docker:/usr/share/nginx/html nginx`

* rodando um container mapeando um `mount`

    `docker run --name nginx -p 8080:80 -d --rm --mount type=bind,source=C:/Users/jkavdev/Documents/docker,target=/usr/share/nginx/html nginx`    

* `-v` se o diretorio nao existir, ele vai criar
* `--mount` se o diretorio nao existir, ele da erro ao rodar o container

* criando um volume

    `docker volume create NOME_VOLUME`

* removendo volumes que nao sao utilizados por containers

    `docker volume prune`    

* rodando um container mapeando um volume ja existe

    `docker run --name nginx -p 8080:80 -d --rm --mount type=volume,source=NOME_VOLUME,target=PASTA_DESTINO_CONTAINER nginx`    

* compilando um docker file, onde o `.` indica o diretorio atual, e o arquivo `Dockerfile`

    `docker build -t laravel .`

* compilando um docker file em outra pasta com outro nome, o arquivo esta dentro da pasta docker com o nome de Dockerfile_php

    `docker build -t laravel -f docker/Dockerfile_php docker`

# Docker - Desafios
## Docker - Desafio Go
* foi criado uma imagem que compila o arquivo ``go``, e outro ``estagio`` que copia os arquivos compilados, a partir da menor imagem possivel do docker `scratch`, pois os arquivos gerados apos a compilacao do ``go`` sao executaveis, precisando apenas do basico do linux para serem executados

* [repositorio da imagem docker desafio go](https://hub.docker.com/repository/docker/jkavdev/codeeducation)

* [Dockerfile do desafio go](https://github.com/jkavdev/maratona_fullcycle/blob/feature/readme-docker/docker/Dockerfile_desafio_go)

* rodando o container da imagem do desafio go

    `docker run --rm jkavdev/codeeducation`
