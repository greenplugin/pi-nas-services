#
# Dockerfile minidlna
#

FROM alpine

# install minidlna
RUN \
   apk update && \
   apk upgrade && \
   apk add bash minidlna ffmpegthumbnailer inotify-tools sqlite

CMD minidlnad -d -f /etc/minidlna.conf