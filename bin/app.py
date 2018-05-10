import web , re , urlparse, requests , string , urllib
from web import form

# routing
urls = (
	'/','index'
)


# templates
render = web.template.render('templates/', base="layout", globals={'re':re})


myform = form.Form( 
	form.Textbox("ORCID",
		form.notnull,
		form.regexp(r'^http[s]?:\/\/orcid.org\/(\d{4})-(\d{4})-(\d{4})-(\d{3}[0-9X])$', 'Must be a ORCID')), #regex suggested by pkp (ojs)
    form.Textbox("DOI", 
        form.notnull,
        form.regexp(r'^10.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$', 'Must be a DOI')), #regex suggested by crossref
    form.Textarea('references',
    	form.notnull),
    form.Dropdown('style', ['Chicago', 'MLA'], form.notnull)
    ) 


# TO BE CHANGED
uribaseAPI = ''
q1 = '?doi='
q2 = '?style='
q3 = '?ref='


class index: 
    def GET(self): 
        form = myform()
        return render.index(form, results=None)

    def POST(self): 
        form = myform() 
        if not form.validates(): 
            return render.index(form=form, results=None)
        else:
            splitReferencesText = [x for x in string.split(form['references'].value, '\n') if x != '\r'] # extract references from 'references'  
            results = {}         
            for referenceText in splitReferencesText:
            	encodedReference = '+'.join(word for word in re.compile('\w+').findall(referenceText)) 
            	# request = requests.get(uribaseAPI+q1+form['DOI'].value+q2+form['style'].value+q3+referenceText) 
            	request = requests.get('https://api.crossref.org/works?query='+encodedReference+'?sample=3&select=DOI,title')
            	results[referenceText] = request.text
            return render.index(form=form, results=results)


if __name__ == "__main__":
	app = web.application(urls, globals())
	app.internalerror = web.debugerror
	app.run()