// JobList.js
import React from 'react';
import PropTypes from 'prop-types';
import Job from './Job';

const JobList = (props) => {
  const { data } = props;
  const jobNodes = data.map(job => (
    <Job
      key={job._id}
      id={job._id}
      jobTitle={job.job_title}
      jobLink={job.job_link}
      wage={job.wage}
      posted={job.posted}
      description={job.description}
      company={job.company}
      companyLink={job.company_link}
      location={job.location}
      source={job.source}
      searchTerm={job.search_term}
      handleHideJob={props.handleHideJob}
      wageMaxEur={job.wage_max_eur}
      jobLinkFull={job.job_link_full}
      hide={job.hide}
    />
  ));
  return (
    <div className="parentGrid">
      { jobNodes }
    </div>
  );
};

JobList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    job_title: PropTypes.string,
    job_link: PropTypes.string,
    wage: PropTypes.string,
    wage_min: PropTypes.number,
    wage_min_currency: PropTypes.string,
    wage_max: PropTypes.number,
    wage_max_currency: PropTypes.string,
    posted: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.string,
    company: PropTypes.string,
    company_link: PropTypes.string,
    location: PropTypes.string,
    source: PropTypes.string,
    search_term: PropTypes.arrayOf(PropTypes.string),
    wage_max_eur: PropTypes.number,
    job_link_full: PropTypes.string,
    hide: PropTypes.bool,
  })),
  handleHideJob: PropTypes.func.isRequired,
};

JobList.defaultProps = {
  data: [],
};

export default JobList;
