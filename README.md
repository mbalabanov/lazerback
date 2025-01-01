# Lazerback Search
A simple but efficient website search in JavaScript for static websites.

![The Lazerback Search](img/lazerback-title-image.jpg)

## Running the Script to Create a Search Index
The process begins by creating a search index from the locally stored static website using the Cheerio library. I wrote a Node.js script for this purpose. This is the only part of the project that requires Node.js, as it uses the Cheerio and FS libraries. The script processes a list of local URLs, extracting the title, pathname, and all text within the <main> element. It then cleans up unnecessary line breaks and multiple spaces before appending the processed data to a search index. The resulting search index is saved as a separate JavaScript file, exported as a constant.

Install the project (only needs Cheerio and FS):
```
npm install
```

`index_script.js` can only reliably index locally stored web pages. Edit the file. In the array `pages` you add the paths of the individual static pages, make sure you run `index_script.js` from the root of your website directory so that the paths in the `pages` array match the relative URLs in your website.

Run `index_script.js` with:
```
node index_script.js
```

This will generate the file `site-index.js` in the `js` directory.

## Add search.js to Your Website
`search.js` creates and inserts the search UI into the page, loads the search index and searches for terms entered by a user. Search results list the page titles linked to the pages. When a user clicks on a search result, then they are forwarded to the respective page and their search term is highlighted and the page scrolls to the location of the found search term.

## More Infos
You can find out more details about how the search works and how I created it here: [marincomics.com/website-search-function.html](https://marincomics.com/website-search-function.html)
