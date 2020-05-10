#
# Dockerfile minidlna
#

FROM alpine

# install minidlna
RUN apk --no-cache add minidlna

# Add config file
#ADD minidlna.conf /etc/minidlna.conf

ENTRYPOINT [ "/usr/sbin/minidlnad", "-S" ]