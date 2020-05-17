#
# Dockerfile for transmission
#
FROM alpine
MAINTAINER Dolitsch Nikolai <nikolai@4best.su>

# Install transmission
RUN apk --no-cache --no-progress upgrade && \
    apk --no-cache  add bash curl shadow sed tini \
                transmission-daemon transmission-cli tzdata


CMD /usr/bin/transmission-daemon --foreground --no-portmap --log-error --config-dir /var/transmission/config
