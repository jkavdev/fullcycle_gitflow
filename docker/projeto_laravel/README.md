* criando `network` para comunicao entre os containers

    `docker create network netphp`

* ou se conectando a rede criada

    `docker network connect netphp phplaravel`
    `docker network connect netphp phplaravel`

* rodando o container do php

    `docker run --rm --name laravel -d --network netphp phplaravel:prod`

* rodando o container do nginx

    `docker run --rm --name nginx -d --network netphp -p 8080:80  nginxlaravel:prod`

# Docker compose    

* listando os compose ativos

    `docker-compose ls`
    `docker-compose ps`

* derrubando todos os compose

    `docker-compose down`

* iniciando um docker-compose

    `docker-compose up`

* iniciando um docker-compose em modo `detached`

    `docker-compose up -d`     

* rebuildando o docker-compose apenas com as alteracoes feitas

    `docker-compose up -d --build`     