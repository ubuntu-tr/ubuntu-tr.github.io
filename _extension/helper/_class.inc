{% assign list = "container,grid,row1,row1column,row2,row2column1,row2column2,blockContainer,blockHeader,postContainer,postHeader,postAuthor,postCategory,postDate,postSummary,postImage,postContent,postTags,cardImage,cardCategory,cardHeader,cardDate,cardAuthorIcon,cardDimmer,cardDimmerHeader,cardDimmerP" | split: "," %}{% 
for key in list %}{% 
	assign order = 99 %}{% 
	assign key2 = key | append: "Add" %}{% 
	for ext in site.theme %}{% 
		if ext[page.type] == "class" %}{{ 
			ext[key2] }}{% 
			if ext[key] and order > ext.order %}{% 
				assign temp = ext[key] %}{% assign order = ext.order %}{% 
			endif %}{% 
		endif %}{% 
	endfor %} {{ 
	temp }},{% 
endfor %}