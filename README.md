# Floor Plan Manager

### Inspiration

![homeRoughEditor](https://raw.githubusercontent.com/ekymoz/homeRoughEditor/master/test.jpg)

https://ekymoz.github.io/homeRoughEditor/

## TODO Layers

- Furniture
- Plumbing
- Garden
- HVAC

## Importing Floor Plan JSON

In Chrome Developer Tools browser console:

```
importFloorplan({ ...{BROWSER_FLOORPLAN_JSON} })
```

## Code Formatting / Linting

Run a check of all files that will be formatted:

```
./node_modules/.bin/prettier --check .
```

Perform formatting in-place:

```
./node_modules/.bin/prettier --write .
```
