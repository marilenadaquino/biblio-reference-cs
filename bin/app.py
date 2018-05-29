import web , re , urlparse, requests , string , urllib , time , datetime
from web import form

# routing
urls = (
	'/','index',
    '/results', 'results'
)


# templates
render = web.template.render('templates/', base="layout", globals={'re':re})

class DinamycForm(form.Form):
    """dynamic form"""
    def add_input(self, new_input):
        list_inputs = list(self.inputs)
        list_inputs.insert( (len(list_inputs) -1), new_input)
        self.inputs = tuple(list_inputs)

authorForm = DinamycForm(
    form.Textbox('author', form.notnull , description='author'),
    form.Button("form_action", value='add' , description='add', type="submit")
    )

# TODO what are the parameters for the citing entity?
myform = form.Form( 
    form.Textbox('title', form.notnull),
    form.Textbox('journal'),
    form.Textbox('volume'),
    form.Textbox('issue'),
    form.Textbox('year', form.notnull),
    form.Textbox('publisher', form.notnull),
	# form.Textbox("ORCID", form.notnull,
	# 	form.regexp(r'^http[s]?:\/\/orcid.org\/(\d{4})-(\d{4})-(\d{4})-(\d{3}[0-9X])$', 'Must be a ORCID')), #regex suggested by pkp (ojs)
    form.Textbox("DOI", form.notnull,
        form.regexp(r'^10.\d{4,9}\/[-._;()/:a-zA-Z0-9]+$', 'Must be a DOI')), #regex suggested by crossref
    form.Textarea('references', form.notnull , post='<em>paste your references here - each paragraph corresponds to a single reference entry.</em>'),
    form.Dropdown('style', ['Chicago', 'MLA'], form.notnull),
    form.Button("form_action", value='search' , description='search', type="submit")
    ) 

f = myform() 
authorform = authorForm()  

class index: 
    def GET(self): 
        f = myform()
        authorform = authorForm()
        return render.index(authorform, f, results=None)


    def POST(self): 
        data = web.input()
        i = web.input(form_action='add')
        s = web.input(form_action='search')
        ts = time.time() # TODO change it

        if (i.form_action == 'add') and not authorform.validates():
            authorform.add_input(web.form.Textbox('author '+str(len(authorform.inputs)) )) 
            return render.index(authorForm=authorform, form=f, results=None)
        elif not authorform.validates():
            return render.index(authorForm=authorform, form=f, results=None)
        elif not f.validates():
            return render.index(authorForm=authorform, form=f, results=None)
        elif (s.form_action == 'search') and f.validates() and authorform.validates():
            #####################
            # placeholder for the first call to the API: send metadata of the citing entity: NB multiple authors
            #####################
            raise web.seeother('/results?references='+urllib.quote_plus((web.input().references).encode('ascii', 'ignore'))+'?time='+str(ts))
                              

class results:
    def GET(self):
        s = web.input()
        referencesDecoded = urllib.unquote(web.input().references).decode('utf8')
        splitReferencesText = [x for x in string.split(referencesDecoded, '\n') if x != '\r'] # extract references from 'references' 
        results = {}         
        for referenceText in splitReferencesText:
            encodedReference = '+'.join(word for word in re.compile('\w+').findall(referenceText))
            #####################
            # placeholder for the second call to the API: change the following line
            #####################
            request = requests.get('https://api.crossref.org/works?query='+encodedReference+'?sample=1&select=DOI,title')
            results[referenceText] = request.text
        sortedResults = sorted(results.items(), key=lambda x: x[0])
        return render.results(results=sortedResults, content='Placeholder for the citing entity')
    
    # def POST(self):
    #     data = web.input(customRef=[])
    #     customReferences = data.customRef
        


if __name__ == "__main__":
	app = web.application(urls, globals())
	app.internalerror = web.debugerror
	app.run()