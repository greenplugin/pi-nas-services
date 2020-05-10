#
# Dockerfile minidlna
#

FROM alpine

# install minidlna
RUN apk --no-cache add minidlna

# Add config file
#ADD minidlna.conf /etc/minidlna.conf

EXPOSE 1900/udp
EXPOSE 8200/tcp

ENTRYPOINT [ "/usr/sbin/minidlnad", "-S" ]