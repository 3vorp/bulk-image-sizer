# Bulk Image Sizer

it sizes your textures in bulk

this took me 21 minutes of my life I'm not getting back

## Requirements

you need node + pnpm for this (who could have guessed)

## Usage

you only have to do this thingy once

```sh
pnpm i
```

then from then on you just need to

```sh
pnpm start /my/path/here
```

the path can be basically anything and it should probably work (it just uses node:path's resolve function)

## Results

the output file will go into the root search folder so you can actually put this script anywhere and it'll work fine (as long as node_modules is somewhere above it in the tree)

the format is:
```log
[width x height]	/path/image.png
[width x height]	/path/another_one.png
```

should be pretty obvious
