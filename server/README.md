Enregistrement
=
Enregistrer le son en mp3 et l'image en avi avec ffmpeg depuis un serveur. 
Streamer l'image dans le navigateur de l'application.

! Impossible de treamer du avi en html5.
	-> RecordRTC pour la video en webm et ffmpeg pour le son
	! Peut etre des problème de synchro à venir...

1.On record la video en RecordRTC et on obtient un webm, en même temps on enregistre un mp3 avec ffmpeg
2.On playback audio et video en meme temps pour validation
3.Bien plus tard, on merge le résultat.

Audio record
=
~~~~~
ffmpeg -f dshow -i audio="@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{4C4A4299-7FC9-4573-A1C8-7AD81EF8AAA5}" -t 00:00:30 C:\Users\mediateur\Documents\crypt_os_captation\test\out.mp3
~~~~~


Merge
=
~~~~~
ffmpeg -i video.avi -i audio.mp3 -c:v libvpx-vp9 -crf 20 -b:v 0 -c:a libvorbis -strict experimental output_merged.webm
~~~~~