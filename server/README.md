Enregistrement
=
Enregistrer le son en mp3 et l'image en avi avec ffmpeg depuis un serveur. 
Streamer l'image dans le navigateur de l'application.

! Impossible de streamer du avi en html5.
	-> RecordRTC pour la video en webm et ffmpeg pour le son
	! Peut etre des problème de synchro à venir...

1.On record la video en RecordRTC et on obtient un webm, en m?me temps on enregistre un mp3 avec ffmpeg
2.On playback audio et video en meme temps pour validation
3.Bien plus tard, on merge le résultat.

TODOS
=
-[ ] Problème de synchronisation son/image du fait de l'enregistrement en deux fichiers.

Audio record
=
~~~~
ffmpeg -f dshow -i audio="@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{4C4A4299-7FC9-4573-A1C8-7AD81EF8AAA5}" -t 00:00:30 C:\Users\mediateur\Documents\crypt_os_captation\test\out.mp3
~~~~


Merge
=
~~~~
ffmpeg -i video.avi -i audio.mp3 -c:v libvpx-vp9 -crf 20 -b:v 0 -c:a libvorbis -strict experimental output_merged.webm
~~~~

Config
=
Pour configurer ffmpeg et le temps de record :
~~~~
ffmpeg -list_devices true -f dshow -i dummy
~~~~
*Trouvé sur [ffmpeg Wiki - DirectShow](https://trac.ffmpeg.org/wiki/DirectShow)*

Tests
=
Des test réalisés avec des presets trouvés sur le web, sans vraiment comprendre les paramètres
~~~~
ffmpeg -r 25 -rtbufsize 2100M -f dshow -i video="@device_pnp_\\?\usb#vid_5986&pid_055c&mi_00#6&38cd688a&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global" -r 25 -f dshow -i audio="Microphone (Realtek High Definition Audio)" -preset veryfast -video_size 1280:720 -b:v 2400k -maxrate 2400k -bufsize 600k -threads 8 -vcodec libvpx -t 00:00:10 out.webm
~~~~
Mauvaise qualité et problème de synchronisation
