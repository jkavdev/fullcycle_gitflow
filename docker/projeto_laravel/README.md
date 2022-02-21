* criando `network` para comunicao entre os containers

    `docker create network netphp`

* ou se conectando a rede criada

    `docker network connect netphp phplaravel`
    `docker network connect netphp phplaravel`

* rodando o container do php

    `docker run --rm --name laravel -d --network netphp phplaravel:prod`

* rodando o container do nginx

    `docker run --rm --name nginx -d --network netphp -p 8080:80  nginxlaravel:prod`