// pages/markdown.js
import React, { useEffect } from 'react';
import Markdown from 'react-markdown';
import {apiService} from 'authscape';

const MarkdownPage = () => {

  const [markdown, setmarkMdown] = useState(null);

  // const markdown = '# Hi, *Pluto*!'


  useEffect(() => {
  
  const fetchData = async () => {
    let releases = await apiService().get("/releases");
    if (releases != null && releases.status == 200)
    {
      setmarkMdown(releases.data);
    }
  }
  fetchData();

}, []);


return (
    <div>
      <Markdown>{markdown}</Markdown>
    </div>
  );
};

export default MarkdownPage;
