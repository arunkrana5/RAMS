using MODEL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using INTERFACE;
using COMMON;

namespace DAL
{
    public class CommonUploadDAL: ICommonUpload
    {


        #region ICommonUploadDAL Members 

        public CommonUploadEntity GetDocumentConfigByID(CommonUploadEntity CommonUpload)
        {
            int result = 0;
            CommonUploadEntity lststObj = new CommonUploadEntity();
            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand SqlCmd = new SqlCommand("Spu_SetDMS", con))
                    {
                        SqlCmd.CommandType = CommandType.StoredProcedure;
                        SqlCmd.Parameters.AddWithValue("@mode", CommonUpload.Mode);
                        SqlCmd.Parameters.AddWithValue("@CompanyID", CommonUpload.CompanyID);

                        SqlCmd.Parameters.AddWithValue("@FormID", CommonUpload.FormID);


                        con.Open();
                        using (SqlDataReader myReader = SqlCmd.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    lststObj = ReadDocumentConfig(myReader);
                                }
                            }
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
            return lststObj;

        }

        public VerifyDocumentUpload VerifyDocumentUpload(CommonUploadEntity ds)
        {
            VerifyDocumentUpload doclist = new VerifyDocumentUpload();

            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand myCommand = new SqlCommand("Spu_SetDMS", con))
                    {
                        myCommand.CommandType = CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@mode", ds.Mode);
                        myCommand.Parameters.AddWithValue("@ID", ds.ID);
                        myCommand.Parameters.AddWithValue("@FormID", ds.FormID);
                        myCommand.Parameters.AddWithValue("@ModuleCode", ds.ModuleCode);
                        myCommand.Parameters.AddWithValue("@DocumentID", ds.DocumentID);
                        if (con.State == ConnectionState.Open)
                            con.Close();
                        con.Open();
                        using (SqlDataReader myReader = myCommand.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    doclist = VerifyDocumentUploadReader(myReader);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return doclist;
        }

        private VerifyDocumentUpload VerifyDocumentUploadReader(IDataRecord myRecord)
        {
            VerifyDocumentUpload stobj = new VerifyDocumentUpload();
            stobj.ID = (int)myRecord.GetInt32(myRecord.GetOrdinal("MappingID"));
            stobj.DocumentCode = myRecord.GetString(myRecord.GetOrdinal("DocumentCode"));
            stobj.DocumentName = myRecord.GetString(myRecord.GetOrdinal("DocumentName"));
            stobj.DocumentSize = myRecord.GetDecimal(myRecord.GetOrdinal("DocumentSize"));
            stobj.FormName = myRecord.GetString(myRecord.GetOrdinal("FormName"));
            stobj.FileName = myRecord.GetString(myRecord.GetOrdinal("FileName"));

            return stobj;
        }


        public List<CommonUploadEntity> GetDocumentConfigByFormIDList(CommonUploadEntity CommonUpload)
        {
            int result = 0;
            List<CommonUploadEntity> lststObj = new List<CommonUploadEntity>();
            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand myCommand = new SqlCommand("Spu_SetDMS", con))
                    {
                        myCommand.CommandType = CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@mode", CommonUpload.Mode); 
                        myCommand.Parameters.AddWithValue("@ModuleCode", CommonUpload.ModuleCode);
                        myCommand.Parameters.AddWithValue("@FormID", CommonUpload.FormID);

                        con.Open();
                        using (SqlDataReader myReader = myCommand.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    lststObj.Add(ReadDocumentConfig(myReader));
                                }
                            }
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
            return lststObj;

        }


        public CommonUploadEntity GetDocumentConfigByDocumentAndForm(CommonUploadEntity CommonUpload)
        {
            CommonUploadEntity lststObj = new CommonUploadEntity();
            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand SqlCmd = new SqlCommand("Spu_SetDMS", con))
                    {
                        SqlCmd.CommandType = CommandType.StoredProcedure;
                        SqlCmd.Parameters.AddWithValue("@mode", CommonUpload.Mode);
                        //SqlCmd.Parameters.AddWithValue("@CompanyID", CommonUpload.CompanyID);
                        SqlCmd.Parameters.AddWithValue("@ModuleCode", CommonUpload.ModuleCode);

                        SqlCmd.Parameters.AddWithValue("@FormID", CommonUpload.FormID);
                        SqlCmd.Parameters.AddWithValue("@DocumentID", CommonUpload.DocumentID);

                        con.Open();
                        using (SqlDataReader myReader = SqlCmd.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    lststObj = ReadDocumentConfig(myReader);
                                }
                            }
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
            return lststObj;

        }


        public int ExecuteDocumentUploadEntry(CommonUploadEntity Inv)
        {
            int result = 0;
            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand SqlCmd = new SqlCommand("Spu_SetDMS", con))
                    {
                        SqlCmd.CommandType = CommandType.StoredProcedure;
                        SqlCmd.Parameters.AddWithValue("@mode", Inv.Mode);
                        SqlCmd.Parameters.AddWithValue("@ID", Inv.ID);
                        SqlCmd.Parameters.AddWithValue("@FormID", Inv.FormID);
                        SqlCmd.Parameters.AddWithValue("@ModuleCode", Inv.ModuleCode);
                        SqlCmd.Parameters.AddWithValue("@ReferenceID", Inv.ReferenceID);
                        SqlCmd.Parameters.AddWithValue("@FolderName", Inv.FolderName);
                        SqlCmd.Parameters.AddWithValue("@FileName", Inv.FileName);
                        SqlCmd.Parameters.AddWithValue("@Remarks", Inv.Remarks);
                        SqlCmd.Parameters.AddWithValue("@DocumentID", Inv.DocumentID);

                        if (Inv.CreatedBy > 0)
                            SqlCmd.Parameters.AddWithValue("@CreatedBy", Inv.CreatedBy);

                        SqlCmd.Parameters.Add("@Result", SqlDbType.Int);
                        SqlCmd.Parameters["@Result"].Direction = ParameterDirection.ReturnValue;

                        con.Open();
                        result = SqlCmd.ExecuteNonQuery();
                        result = (int)SqlCmd.Parameters["@Result"].Value;
                    }
                    con.Close();
                }
            }

            catch (SqlException sq)
            {
                return (int)sq.ErrorCode;
            }
            catch (Exception Ex)
            {

                throw;
            }
            return result;

        }



        public CommonUploadEntity GetDocumentByID(CommonUploadEntity CommonUpload)
        {
            CommonUploadEntity lststObj = new CommonUploadEntity();
            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand SqlCmd = new SqlCommand("Spu_SetDMS", con))
                    {
                        SqlCmd.CommandType = CommandType.StoredProcedure;
                        SqlCmd.Parameters.AddWithValue("@mode", CommonUpload.Mode);
                        SqlCmd.Parameters.AddWithValue("@ID", CommonUpload.ID);

                        con.Open();
                        using (SqlDataReader myReader = SqlCmd.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    lststObj = ReadDocument(myReader);
                                }
                            }
                        }
                    }
                    con.Close();
                }
            }
            catch (Exception Ex)
            {

                throw;
            }
            return lststObj;
        }

        public IEnumerable<UploadedDocumentList> GetUploadedDocumentsList(CommonUploadEntity ds)
        {
            List<UploadedDocumentList> doclist = new List<UploadedDocumentList>();

            try
            {

                using (SqlConnection con = new SqlConnection(ClsCommon.ConnectionString()))
                {
                    using (SqlCommand myCommand = new SqlCommand("Spu_SetDMS", con))
                    {
                        myCommand.CommandType = CommandType.StoredProcedure;
                        myCommand.Parameters.AddWithValue("@mode", ds.Mode);
                        myCommand.Parameters.AddWithValue("@Id", ds.ID);
                        myCommand.Parameters.AddWithValue("@FormID", ds.FormID);
                        myCommand.Parameters.AddWithValue("@ModuleCode", ds.ModuleCode);
                        myCommand.Parameters.AddWithValue("@ReferenceID", ds.ReferenceID);
                        myCommand.Parameters.AddWithValue("@DocumentID", ds.DocumentID);
                        if (con.State == ConnectionState.Open)
                            con.Close();
                        con.Open();
                        using (SqlDataReader myReader = myCommand.ExecuteReader())
                        {
                            if (myReader.HasRows)
                            {
                                while (myReader.Read())
                                {
                                    doclist.Add(ReadUploadedDocumentList(myReader));
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return doclist;
        }


        private UploadedDocumentList ReadUploadedDocumentList(IDataRecord myRecord)
        {
            UploadedDocumentList stobj = new UploadedDocumentList();
            stobj.ID = (int)myRecord.GetInt32(myRecord.GetOrdinal("MappingID"));
            stobj.DocumentCode = myRecord.GetString(myRecord.GetOrdinal("DocumentCode"));
            stobj.DocumentName = myRecord.GetString(myRecord.GetOrdinal("DocumentName"));
            stobj.DocumentSize = myRecord.GetDecimal(myRecord.GetOrdinal("DocumentSize"));
            stobj.FolderName = myRecord.GetString(myRecord.GetOrdinal("FolderName"));
            stobj.FileName = myRecord.GetString(myRecord.GetOrdinal("FileName"));
            stobj.DocumentID = myRecord.GetInt32(myRecord.GetOrdinal("DocumentID"));
            stobj.Remarks = myRecord.GetString(myRecord.GetOrdinal("Remarks"));

            return stobj;
        }


        private CommonUploadEntity ReadDocumentConfig(IDataRecord myRecord)
        {
            CommonUploadEntity stobj = new CommonUploadEntity();
            stobj.FolderName = myRecord.GetString(myRecord.GetOrdinal("FolderName"));
            stobj.FormName = myRecord.GetString(myRecord.GetOrdinal("FormName"));
            stobj.DocumentName = myRecord.GetString(myRecord.GetOrdinal("DocumentName"));
            stobj.DocumentCode = myRecord.GetString(myRecord.GetOrdinal("DocumentCode"));
            stobj.DocumentSize = myRecord.GetDecimal(myRecord.GetOrdinal("DocumentSize"));
            stobj.DocumentID = myRecord.GetInt32(myRecord.GetOrdinal("DocumentID"));
            stobj.FormID = myRecord.GetInt32(myRecord.GetOrdinal("FormID"));

            return stobj;
        }



        private CommonUploadEntity ReadDocument(IDataRecord myRecord)
        {
            CommonUploadEntity stobj = new CommonUploadEntity();
            stobj.ID = myRecord.GetInt32(myRecord.GetOrdinal("ID"));
            stobj.FileName = myRecord.GetString(myRecord.GetOrdinal("FileName"));
            stobj.IsActive = Convert.ToInt32(myRecord.GetBoolean(myRecord.GetOrdinal("IsActive")));
            stobj.IsDeleted = Convert.ToInt32(myRecord.GetBoolean(myRecord.GetOrdinal("IsDelete")));
            stobj.FolderName = myRecord.GetString(myRecord.GetOrdinal("FolderName"));

            return stobj;
        }



        #endregion
    }
}
