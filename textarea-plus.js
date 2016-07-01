/**
 *
 * MIT License
 *
 * Copyright (c) 2016 Shrumit Mehta
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
**/
(function ($) {

	// Dependency
	if (typeof($.fn.textareaHelper) !== "function") {
		var script = document.createElement('script');
		script.src = 'https://cdn.rawgit.com/shrumit/textarea-helper/master/textarea-helper.js';
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	$.fn.setCaret = function (pos, options){
		
		var settings = $.extend({
			range: 0
		}, options);
		
		if (this[0].setSelectionRange) {
	      this[0].focus();
	      this[0].setSelectionRange(pos, pos + settings.range);
	    } else if (this[0].createTextRange) {
	      var range = this[0].createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos + settings.range);
	      range.moveStart('character', pos);
	      range.select();
	    }
	}

	$.fn.getCaretIndex = function (options){

		var settings = $.extend({
			ofLine: false
		}, options);
		
		var absoluteIndex = this.prop("selectionStart");
		
		if (settings.ofLine){
			
			var re = new RegExp('[\s\S]*^(.*)<@end!>$', 'm');
			var res = re.exec(this.val().substring(0, absoluteIndex) + '<@end!>');
			if (res){
				return res[1].length;
			} else {
				return 0;
			}
			
		} else{
			return absoluteIndex
		}
	}
	
	$.fn.getCaretPosition = function() {
		var caretPos = this.textareaHelper('caretPos');
		this.textareaHelper('destroy');
		var elemPos = this.offset();
		caretPos.top += elemPos.top;
		caretPos.top += this.getLineHeight();
		caretPos.left += elemPos.left;
		var ebemrod = "asdasd12"
		return caretPos;
	}
	
	$.fn.getLineHeight = function (){
		var fontSize = this.css('font-size');
		var height =  Math.floor(parseInt(fontSize.replace('px', '')) * 1.5);
		return height;
	}
	
	$.fn.getLine = function (pos, options) {

		var settings = $.extend({
			getBeforeOnly: false,
			getAfterOnly: false
		}, options)
		
		if (pos == null)
			pos = this.getCaretIndex();
		
		var line = "";
		
		if (!settings.getAfterOnly) {
			let re = /^(.*)~!@$/m;
			let result = re.exec(this.val().substring(0, pos) + '~!@');
			(result !== null) && (line += result[1]);
		}
		
		if (!settings.getBeforeOnly) {
			let re = /^~!@(.*)$/m;
			let result = re.exec('~!@' + this.val().substring(pos, this.val().length));
			(result !== null) && (line += result[1]);
		}
			
		return line;
	}
	
	$.fn.insert = function (text, pos, options){
		
		var settings = $.extend({
			caretAtOriginal: false,
			adjustCaret: 0
		}, options)

		var cursorPos = this.getCaretIndex();
		
		if (pos == null)
			pos = cursorPos;
		
		var oldVal = this.val();
		var newVal = oldVal.substring(0, pos) + text + oldVal.substring(pos, oldVal.length);
		this.val(newVal);
			
		if (settings.caretAtOriginal)
			newPos = cursorPos + settings.adjustCaret;
		else
			newPos = pos + text.length + settings.adjustCaret;
		
		this.setCaret(newPos);
	}
		
	
} (jQuery));
