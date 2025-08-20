// Released under the MIT license
// created by: Frank Zondlo
// Quick and dirty jquery script to split ULs into multiple columns

(function ($) {
  "use strict";
  $.fn.cols = function (num_columns) {
    //Break up the array into manageable chunks
    function chunk(arr, number_of_chunks) {
      var chunks = [],
        i = 0,
        n = arr.length,
        closest_divisible_num = n,
        chunk_size;

      while (closest_divisible_num % 2 !== 0) {
        closest_divisible_num++;
      }

      chunk_size = closest_divisible_num / number_of_chunks;

      while (i < n) {
        chunks.push(arr.slice(i, (i += chunk_size)));
      }

      return chunks;
    }

    // Turns an array list of UL elements into html
    function createHTML(list) {
      var html = "",
        i = 0;

      for (; i < list.length; i++) {
        html += "<li>" + list[i] + "</li>";
      }

      return html;
    }

    //Iterate through each match and apply
    $(this).each(function () {
      var cur_class = $(this).attr("class"),
        li_arr = [],
        array_chunks,
        new_html = "",
        i = 0;

      //Get the current class, so we can add it
      //to the new ULs we will create.
      if (cur_class === undefined) {
        cur_class = "";
      } else {
        cur_class = "class='" + cur_class + "' ";
      }

      //Create array of all posts in lists
      $(this)
        .find("li")
        .each(function () {
          li_arr.push($(this).html());
        });

      //add the HTML back to the dom tree
      array_chunks = chunk(li_arr, num_columns);
      for (; i < num_columns; i++) {
        if (i < array_chunks.length) {
          new_html =
            new_html +
            "<ul " +
            cur_class +
            ">" +
            createHTML(array_chunks[i]) +
            "</ul>";
        } else {
          new_html = new_html + "<ul " + cur_class + "></ul>";
        }
      }

      $(this).replaceWith(new_html);
    });
  };
})(jQuery);
