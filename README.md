# Textarea-Plus
*Some functions to make textarea manipulation easier*

## API

####.setCaret(pos [,options])

* **pos** Index to place caret at
* **options**
 * **range** Characters to select *(default: 0)*
 
####.getCaretIndex([options])

* **options**
 * **ofLine** Get index of caret on its line *(default: false)*
* **_returns_** Index

####.getCaretPosition()

* **_returns_** Absolute XY position of caret in pixels as *{ top:_, left:_ }*

####.getLineHeight()

* **_returns_** Line height in px

####.getLine([pos, options])

* **pos** Index within the line to get. *(default: line of current caret position)*
* **options**
 * **getBeforeOnly** Get all text on line before pos *(default: false)*
 * **getAfterOnly** Get all text on line after pos *(default: false)*
 * *When both options are true, will return ""*
* **_returns_** Text on one line

####.insert(text [, pos , options])

* **text** String to insert
* **pos** Index to insert at (absolute). *(default: current caret position)*
* **options**
 * **caretAtOriginal** Leave cursor at original position after inserting *(default: false)*
 * **adjustCaret** Adjust cursor position after text is inserted *(default: 0)* 

## License

#### MIT 
*See header of `textarea-plus.js` for complete license.*
