// JobBox.js
import React, { Component } from 'react';
import 'whatwg-fetch';
import JobList from './JobList';
import './JobBox.css';

class JobBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      locationfilter: '',
      jobfilter: '',
      itemChecked: {},
    };
  }

  componentDidMount() {
    // initial load jobs.
    this.loadJobsFromServer();
  }

  componentWillUnmount() {
  }

  loadJobsFromServer = () => {
    console.log('loadJobsFromServer');
    let fetchUrl = '/api/jobs';
    let queryParams = '';
    const {
      locationfilter, jobfilter, itemChecked,
    } = this.state;
    if (locationfilter) {
      queryParams += `l=${encodeURIComponent(locationfilter)}`;
      console.log(`  location filter ${locationfilter}`);
    } else {
      console.log('  location filter not set');
    }

    if (jobfilter) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams += `j=${encodeURIComponent(jobfilter)}`;
      console.log(`  job filter ${jobfilter}`);
    } else {
      console.log('  job filter not set');
    }

    if (itemChecked.wagefilter) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams += 'allwage=1';
      console.log('  wagefilter True');
    } else {
      console.log('  wagefilter False');
    }

    if (itemChecked.showdel) {
      if (queryParams) {
        queryParams += '&';
      }
      queryParams += 'showdel=1';
      console.log('  showdel True');
    } else {
      console.log('  showdel False');
    }

    if (queryParams) {
      fetchUrl += `?${queryParams}`;
    } else {
      fetchUrl += '/';
    }

    fetch(fetchUrl)
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  onHideJob = (event) => {
    const jobid = event.currentTarget.id;
    if (!jobid) {
      this.setState({ error: 'Invalid id.' });
      return;
    }

    console.log(`onHideJob id: ${jobid}`);

    fetch(`/api/Jobs/${jobid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) {
        this.setState({ error: res.error.message || res.error });
      } else {
        this.loadJobsFromServer();
      }
    });
  }

  onChangeText = (e) => {
    const newState = { ...this.state };
    const newname = e.target.name;
    const newval = e.target.value;
    console.log(`Changed state: ${newname}: ${newval}`);
    newState[newname] = newval;
    // newState['error'] = null;
    this.setState(newState);
  }

  onFilterApply = () => {
    this.loadJobsFromServer();
  }

  onFilterKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.loadJobsFromServer();
    }
  }

  checkItem = (e) => {
    const { itemChecked } = this.state;
    const indexName = e.target.name;
    const checkedStatus = e.target.checked;
    console.log(`Check ${indexName} ${checkedStatus}`);
    itemChecked[indexName] = checkedStatus;
    // Use functional instead of object setState to ensure sychronicity.
    // Old object setState: this.setState({itemChecked});
    this.setState(() => ({
      itemChecked,
    }), () => {
      this.loadJobsFromServer();
    });
  }

  // value={this.state.showdel}
  render() {
    const {
      data, error, locationfilter, jobfilter,
    } = this.state;
    return (
      <div className="jobcontainer">
        <div className="jobs">
          <div className="job_filter">
            <span>
              <label htmlFor="removedFilterInput">
                Include removed
                <input className="space_filter" id="removedFilterInput" type="checkbox" name="showdel" onChange={this.checkItem} />
              </label>
            </span>
            <span>
              <label htmlFor="wageFilterInput">
                Include empty wage
                <input className="space_filter" id="wageFilterInput" type="checkbox" name="wagefilter" onChange={this.checkItem} />
              </label>
            </span>
            <input id="jobFilterInput" type="text" className="space_filter" name="jobfilter" value={jobfilter} onChange={this.onChangeText} onKeyPress={this.onFilterKeyPress} placeholder="Job" />
            <input id="locationInput" type="text" className="space_filter" name="locationfilter" value={locationfilter} onChange={this.onChangeText} onKeyPress={this.onFilterKeyPress} placeholder="Location" />
            <button type="submit" onClick={this.onFilterApply}>Apply</button>
          </div>
          <JobList data={data} handleHideJob={this.onHideJob} />
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default JobBox;
