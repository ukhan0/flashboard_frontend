import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import { get } from 'lodash'

export default function TopicSaveDialog(props) {
  const { searchText } = useSelector(state => state.Topic);
  const [existingTopics, setExistingTopics] = useState([]);
  
  useEffect(() => {
    const fetchTopics = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        const response = await axios.get(`${config.apiUrl}/api/topic/list/${user.id}`);
        const responsePayload = get(response, 'data.data', null);
        setExistingTopics([...responsePayload.map(d => ({label: d.topicText, value: d.topicID}))])
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopics();
  }, []);

  const handleChange = (newValue, actionMeta) => {
    props.onTopicSelect(newValue, actionMeta.action === 'create-option')
  };

  return (
    <div style={{width: 400}}>
      <b className="text-first mb-2">Select Topic</b>
      <CreatableSelect
        isClearable
        onChange={handleChange}
        options={existingTopics}
      />
      <div className="text-black-50">(Type Topic name if it is not in list)</div>
      
      <div className="mt-3 text-black-50">Search Text: {searchText}</div>
    </div>
  );
}
