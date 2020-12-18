#!/bin/bash

# Takes in $1
if [[ -n "$1" ]]; then
  INPUT=$i
else
  INPUT=../index.html
fi

OUTPUT=en.json

echo "{" > $OUTPUT
echo "  \"slides\": {" >> $OUTPUT

OPENBLOCK=0
# Go through file line by line
cat $INPUT | while read line; do
  if echo $line | grep -qE "section id"; then
    # This line starts a section, save
    SECTION=$( echo $line | grep -oE 'id="[a-zA-Z0-9]*"' | cut -d '"' -f2 )
  fi

  if [[ x$SECTION != x$PREVSECTION ]]; then
    # New section
    SAMESECTION=0
    PRINTEDHEADER=0
    if [[ x$PRINTEDHEADER = x0 ]]; then
      HEADER="      \"$SECTION\":{"
    fi
    if [[ x$OPENBLOCK = x1 ]]; then
      echo >> $OUTPUT
      echo "      }," >> $OUTPUT
      OPENBLOCK=0
    fi
  else
    # Same section
    SAMESECTION=1
    if [[ x$PRINTEDHEADER = x1 ]]; then
      HEADER=""
    fi
  fi

  if echo $line | grep -qE "data-i18n"; then
    # There is something here to be translated
    DATANAME=$( echo $line | grep -oE 'data-i18n="[a-zA-Z0-9]*"' | cut -d '"' -f2 )
    ENGLISH=$( echo $line | grep -oP 'data-i18n="[a-zA-Z0-9]*"\s*>.*?</[a-z0-9]*>$' | cut -d '>' -f2- | sed 's#</p>##g;s#</a></li>##g;s#"#\\"#g' )
    if [[ -n "$HEADER" ]]; then 
      echo "$HEADER" >> $OUTPUT
      PRINTEDHEADER=1
      OPENBLOCK=1
    else
      echo , >> $OUTPUT
    fi
    echo -n "         \"$DATANAME\":\"$ENGLISH\"" >> $OUTPUT
  fi
  
  PREVSECTION=$SECTION
done

echo >> $OUTPUT
echo "    }">>$OUTPUT
echo "  }">>$OUTPUT
echo "}">>$OUTPUT

cat $OUTPUT | jq .
