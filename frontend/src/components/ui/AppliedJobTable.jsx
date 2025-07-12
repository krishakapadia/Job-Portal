// src/components/ui/AppliedJobTable.jsx
import React from 'react';
import './AppliedJobTable.css';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Badge } from './badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  return (
    <div className="applied-job-table">
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJobs.length <= 0
              ? <span className="no-jobs">You haven't applied for any job yet.</span>
              : allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id}>
                  <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>{appliedJob.job?.title}</TableCell>
                  <TableCell>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={`status-badge ${appliedJob.status}`}>
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
