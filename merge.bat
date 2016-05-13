ffmpeg -i ./files/out.avi -i ./files/out.mp3 -c:v libvpx-vp9 -crf 0 -b:v 0 -c:a libvorbis -strict experimental output_merged.webm
