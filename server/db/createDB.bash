#!/bin/bash

echo "> Creating database"

if [ -n $1 ]; then
    $(> $1.sqlite)
    cat migrate.sql | sqlite3 $1.sqlite
fi

echo "> Done"
