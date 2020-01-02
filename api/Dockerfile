FROM golang:1.13

# set file
RUN mkdir /go/src/app
WORKDIR /go/src/app
ADD . .

# set env
ENV GO111MODULE=on

# get dev tool
RUN go get github.com/pilu/fresh

# exec dev tool
CMD ["fresh"]
