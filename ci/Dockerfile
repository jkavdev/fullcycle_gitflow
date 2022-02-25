FROM golang:latest

WORKDIR /app

COPY ./app .

# por algum motivo to tento que rodar esse comando para o go funcionar
# sem isso, nao roda o build
RUN go env -w GO111MODULE=off

RUN go build -o math

CMD [ "./math" ]