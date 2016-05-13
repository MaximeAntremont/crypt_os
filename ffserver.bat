REM not for windaubes...
ffserver -f doc/ffserver.conf &
ffmpeg -i ./files/cs.avi http://localhost:8090/feed1.ffm &
pause