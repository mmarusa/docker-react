# Use an exsisting docker image as base
FROM alpine 

# Download and install a dependecy
RUN apk add --update redis
RUN apk add --update gcc

# Tell the image what to do when it starts as a container
CMD ["redis-server"]