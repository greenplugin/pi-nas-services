#
# Dockerfile minidlna
#

FROM alpine

# install minidlna
RUN \
   apk update && \
   apk upgrade && \
   apk add bash minidlna ffmpegthumbnailer inotify-tools sqlite

ENTRYPOINT [ "/usr/sbin/minidlnad", "-S" ]