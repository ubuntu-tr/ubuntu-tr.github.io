#!/bin/bash

sudo apt install pandoc ttf-ubuntu-font-family

mkdir fake
cd fake

# you can replace $HOME with any dir
sed -i 's@\$TEXLIVEHOME@'"$HOME"'@' ../texlive.profile
wget http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz
tar zxf install-tl-unx.tar.gz
./install-tl*/install-tl -profile ../texlive.profile

# texlive.tar.gz is a portable and full TeXLive package
tar zcf texlive.tar.gz -C $HOME texlive

# symlink TeXLive executables to /usr/local/bin/
sudo $HOME/texlive/bin/x86_64-linux/tlmgr path add

# inform apt that all TeXLive dependencies are satisfied
sudo apt-get install equivs
wget https://github.com/scottkosty/install-tl-ubuntu/raw/master/debian-control-texlive-in.txt
equivs-build debian-control-texlive-in.txt
sudo dpkg -i texlive-local*.deb

cd ..
rm -r fake
