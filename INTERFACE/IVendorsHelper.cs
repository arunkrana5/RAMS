using MODEL;
using System.Data;

namespace INTERFACE
{
    public interface IVendorsHelper
    {
        DataSet ExecuteVendor(VendorModel Model); 
    }
}
