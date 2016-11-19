{% if page.type == "post" %}{% 
    include _extension/helper/category.inc %}{% 
    include _extension/helper/dateTR.inc %}{% 
    capture systemHead %}{% 
        assign items = site.theme | sort: 'order', 'last' %}{% 
        for ext in items %}{% 
            if ext.post == "head" %}{{ ext.content }}{% endif %}{% 
        endfor %}{% 
        assign items = site.extension | sort: 'order' %}{% 
        for ext in items %}{% 
            if ext.post == "head" %}{{ ext.content }}{% endif %}{% 
        endfor %}{% 
    endcapture %}{% 
    capture class %}{% 
        include _extension/helper/_class.inc %}{% 
    endcapture %}{% 
    assign class = class | split: "," %}{% 
endif %}{% 
if page.type != "post" %}{% 
    for ext in site.extension %}{% 
        if ext[page.type] == "classAll" %}{% assign class = ext.content | split: "," %}{% 
        elsif ext[page.type] == "systemHead" %}{% assign systemHead = ext.content %}{% 
        elsif ext[page.type] == "systemFoot" %}{% assign systemFoot = ext.content %}{% 
        elsif ext[page.type] == "systemTop" %}{% assign systemTop = ext.content %}{% 
        elsif ext[page.type] == "systemMain" %}{% assign systemMain = ext.content %}{% 
        elsif ext[page.type] == "systemSidebar" %}{% assign systemSidebar = ext.content %}{% 
        elsif ext[page.type] == "systemFooter" %}{% assign systemFooter = ext.content %}{% 
        elsif ext[page.type] == "systemHeader" %}{% assign systemHeader = ext.content %}{% 
        elsif ext[page.type] == "systemMeta" %}{% assign systemMeta = ext.content %}{% 
        endif %}{% 
    endfor %}{% 
endif %}{% 
for ext in site.theme %}{% 
    if ext[page.type] == "includeTop" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemTop = systemTop | append: temp %}{% 
    elsif ext[page.type] == "includeMain" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemMain = systemMain | append: temp %}{% 
    elsif ext[page.type] == "includeSidebar" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemSidebar = systemSidebar | append: temp %}{% 
    elsif ext[page.type] == "includeHeader" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
            endcapture %}{% 
        assign systemHeader = systemHeader | append: temp %}{% 
    elsif ext[page.type] == "includeFooter" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
        endcapture %}{% 
        assign systemFooter = systemFooter | append: temp %}{% 
    elsif ext[page.type] == "includeMeta0" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
        endcapture %}{% 
        assign systemMeta0 = systemMeta0 | append: temp %}{% 
    endif %}{% 
endfor %}{% 
for ext in site.extension %}{% 
    if ext[page.type] == "includeTop" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemTop = systemTop | append: temp %}{% 
    elsif ext[page.type] == "includeMain" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemMain = systemMain | append: temp %}{% 
    elsif ext[page.type] == "includeSidebar" %}{% 
        include _extension/helper/_container.html %}{% 
        assign systemSidebar = systemSidebar | append: temp %}{% 
    elsif ext[page.type] == "includeHeader" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
            endcapture %}{% 
        assign systemHeader = systemHeader | append: temp %}{% 
    elsif ext[page.type] == "includeFooter" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
        endcapture %}{% 
        assign systemFooter = systemFooter | append: temp %}{% 
    elsif ext[page.type] == "includeMeta0" %}{% 
        capture temp %}{% 
            include {{ ext.path | replace:'.html','.inc' }} config=ext %}{% 
        endcapture %}{% 
        assign systemMeta0 = systemMeta0 | append: temp %}{% 
    endif %}{% 
endfor %}