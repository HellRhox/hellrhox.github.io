# Portfolio
Work in Progress

This is my Protfolio.
After the first itteration of it had security flaws I build a new one with inspiration from some templates I found online.

## What can it do ?

The Portfolio loads projects from json files and builds the html to show them on the site. (using JavaScript on the client side in this case because github sites can´t use php).

## How to add/delet/change a Project?

If you want to add a project you open one of the index json files (depending on big or small/side project) and add a item with the name of youre json file for the project you want to add.
To delet on just delet it out of the index file and the site will not look for it.

## Project Templates

Youre project json should look something like this:

```
{
    "title": "The title of youre project",
    "info": "a small text to display a bit more about what the project is",
    "picture": "the path to picture you want",
    "color": "a hexcolour code if youre not using a picture",
    "button": True or false if you need a button to klick for a link to the project or Repo it is in, 
    "button_picture": "A picture that is inside the button (like a Github logo for a button that links to youre github repo)",
    "buttonLinksTo": "The text inside the button",
    "link": "the link the button should take you to"
}
```
If it is a small or big project dependes on the index file you put the name of the json inside of.


-- ---
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/kinda-sfw.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-by-developers.svg)](https://forthebadge.com)
