#!/bin/sh
# Aggiorna il numero ?v= dei CSS/JS locali in tutte le pagine HTML (cache busting).
# Uso: sh bump-version.sh 20261009a
[ -z "$1" ] && { echo "uso: sh bump-version.sh <versione>"; exit 1; }
grep -rlE '(css|js)/[a-z.-]+\.(css|js)\?v=' --include=*.html . | xargs sed -i -E "s/((css|js)\/[a-z.-]+\.(css|js))\?v=[0-9a-z]+/\1?v=$1/g"
echo "versione: $1"
