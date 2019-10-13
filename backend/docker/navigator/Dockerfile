FROM ubuntu:16.04

# Make sure base image is updated
RUN apt-get -qq update
RUN apt-get -qq -y install \
    apt-utils \
    apt-transport-https \
    python3-pip python3-dev

# Create work dir
RUN mkdir -p /dubhacks/backend/navigator
WORKDIR /dubhacks/backend/navigator

# Install packages
COPY requirements.txt .

RUN pip3 install -U -r requirements.txt

# Expose server port
EXPOSE 5000

STOPSIGNAL SIGINT
